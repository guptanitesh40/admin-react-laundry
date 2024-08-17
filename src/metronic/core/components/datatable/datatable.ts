import KTComponent from '../component';
import { KTDataTableDataInterface, KTDataTableInterface, KTDataTableConfigInterface as KTDataTableConfigInterface, KTDataTableSortOrderInterface, KTDataTableStateInterface, KTDataTableColumnFilterInterface, KTDataTableAttributeInterface } from './types';
import KTEventHandler from '../../helpers/event-handler';
import { KTDatatableCheckChangePayloadInterface } from './types';
import KTUtils from '../../helpers/utils';
import KTComponents from '../../index';
import KTData from '../../helpers/data';

/**
 * Custom DataTable plugin class with server-side API, pagination, and sorting
 * @classdesc A custom KTComponent class that integrates server-side API, pagination, and sorting functionality into a table.
 * It supports fetching data from a server-side API, pagination, and sorting of the fetched data.
 * @class
 * @extends {KTComponent}
 * @param {HTMLElement} element The table element
 * @param {KTDataTableConfigInterface} [config] Additional configuration options
 */
export class KTDataTable<T extends KTDataTableDataInterface> extends KTComponent implements KTDataTableInterface {
	protected override _name: string = 'datatable';
	protected override _config: KTDataTableConfigInterface;
	protected override _defaultConfig: KTDataTableConfigInterface;

	private _tableElement: HTMLTableElement;
	private _tbodyElement: HTMLTableSectionElement;
	private _theadElement: HTMLTableSectionElement;

	private _infoElement: HTMLElement;
	private _sizeElement: HTMLSelectElement;
	private _paginationElement: HTMLElement;

	// Checkbox properties
	private _headerChecked: boolean;
	private _headerCheckElement: HTMLInputElement;
	private _targetElements: NodeListOf<HTMLInputElement>;
	private _checkboxListener = (event: MouseEvent) => {
		this._checkboxToggle(event); // Toggle row checkbox state
	};

	// private _searchListener: (value: string) => void;

	private _data: T[] = [];

	constructor(element: HTMLElement, config?: KTDataTableConfigInterface) {
		super();

		if (KTData.has(element as HTMLElement, this._name)) return;

		this._defaultConfig = this._initDefaultConfig(config);

		this._init(element);
		this._buildConfig();

		// Store the instance directly on the element
		(element as any).instance = this;

		this._initElements();

		if (this._config.stateSave === false) {
			this._deleteState();
		}

		if (this._config.stateSave) {
			this._loadState();
		}

		this._initTableHeader();

		this._updateData();

		this._fireEvent('init');
		this._dispatchEvent('init');
	}

	/**
	 * Initialize default configuration for the datatable
	 * @param config User-provided configuration options
	 * @returns Default configuration merged with user-provided options
	 */
	private _initDefaultConfig(config?: KTDataTableConfigInterface): KTDataTableConfigInterface {
		return {
			/**
			 * HTTP method for server-side API call
			 */
			requestMethod: 'GET',
			/**
			 * Custom HTTP headers for the API request
			 */
			requestHeaders: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			/**
			 * Pagination info template
			 */
			info: '{start}-{end} of {total}',
			/**
			 * Info text when there is no data
			 */
			infoEmpty: 'No records found',
			/**
			 * Available page sizes
			 */
			pageSizes: [5, 10, 20, 30, 50],
			/**
			 * Default page size
			 */
			pageSize: 10,
			/**
			 * Enable or disable pagination more button
			 */
			pageMore: true,
			/**
			 * Maximum number of pages before enabling pagination more button
			 */
			pageMoreLimit: 3,
			/**
			 * Pagination button templates
			 */
			pagination: {
				number: {
					/**
					 * CSS classes to be added to the pagination button
					 */
					class: 'btn',
					/**
					 * Text to be displayed in the pagination button
					 */
					text: '{page}',
				},
				previous: {
					/**
					 * CSS classes to be added to the previous pagination button
					 */
					class: 'btn',
					/**
					 * Text to be displayed in the previous pagination button
					 */
					text: '<i class="ki-outline ki-black-left"></i>',
				},
				next: {
					/**
					 * CSS classes to be added to the next pagination button
					 */
					class: 'btn',
					/**
					 * Text to be displayed in the next pagination button
					 */
					text: '<i class="ki-outline ki-black-right"></i>',
				},
				more: {
					/**
					 * CSS classes to be added to the pagination more button
					 */
					class: 'btn',
					/**
					 * Text to be displayed in the pagination more button
					 */
					text: '...',
				}
			},
			/**
			 * Sorting options
			 */
			sort: {
				/**
				 * CSS classes to be added to the sortable headers
				 */
				classes: {
					base: 'sort',
					asc: 'asc',
					desc: 'desc',
				},
				/**
				 * Local sorting callback function
				 * Sorts the data array based on the sort field and order
				 * @param data Data array to be sorted
				 * @param sortField Property name of the data object to be sorted by
				 * @param sortOrder Sorting order (ascending or descending)
				 * @returns Sorted data array
				 */
				callback: (data: T[], sortField: keyof T | number, sortOrder: KTDataTableSortOrderInterface): T[] => {
					/**
					 * Compares two values by converting them to strings and removing any HTML tags or white spaces
					 * @param a First value to be compared
					 * @param b Second value to be compared
					 * @returns 1 if a > b, -1 if a < b, 0 if a === b
					 */
					const compareValues = (a: unknown, b: unknown): number => {
						const aText = String(a).replace(/<[^>]*>|&nbsp;/g, '');
						const bText = String(b).replace(/<[^>]*>|&nbsp;/g, '');
						return aText > bText ? (sortOrder === 'asc' ? 1 : -1) : (aText < bText ? (sortOrder === 'asc' ? -1 : 1) : 0);
					};

					return data.sort((a, b) => {
						const aValue = a[sortField] as unknown;
						const bValue = b[sortField] as unknown;
						return compareValues(aValue, bValue);
					});
				},
			},
			search: {
				/**
				 * Delay in milliseconds before the search function is applied to the data array
				 * @default 500
				 */
				delay: 500, // ms
				/**
				 * Local search callback function
				 * Filters the data array based on the search string
				 * @param data Data array to be filtered
				 * @param search Search string used to filter the data array
				 * @returns Filtered data array
				 */
				callback: (data: T[], search: string): T[] => {
					if (!data || !search) {
						return [];
					}

					return data.filter((item: T) => {
						if (!item) {
							return false;
						}

						return Object.values(item).some((value: string | number | boolean) => {
							if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
								return false;
							}

							const valueText = String(value).replace(/<[^>]*>|&nbsp;/g, '').toLowerCase();
							return valueText.includes(search.toLowerCase());
						});
					});
				}
			},
			/**
			 * Loading spinner options
			 */
			loading: {
				/**
				 * Template to be displayed during data fetching process
				 */
				template: `
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<div class="flex items-center gap-2 px-4 py-2 font-medium leading-none text-2sm border border-gray-200 shadow-default rounded-md text-gray-500 bg-light">
							<svg class="animate-spin -ml-1 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							{content}
						</div>
					</div>
				`,
				/**
				 * Loading text to be displayed in the template
				 */
				content: 'Loading...'
			},
			/**
			 * Selectors of the elements to be targeted
			 */
			attributes: {
				/**
				 * Data table element
				 */
				table: 'table[data-datatable-table="true"]',
				/**
				 * Pagination info element
				 */
				info: '[data-datatable-info="true"]',
				/**
				 * Page size dropdown element
				 */
				size: '[data-datatable-size="true"]',
				/**
				 * Pagination element
				 */
				pagination: '[data-datatable-pagination="true"]',
				/**
				 * Spinner element
				 */
				spinner: '[data-datatable-spinner="true"]',
				/**
				 * Checkbox element
				 */
				check: '[data-datatable-check="true"]',
				checkbox: '[data-datatable-row-check="true"]'
			},
			/**
			 * Enable or disable state saving
			 */
			stateSave: true,
			checkbox: {
				checkedClass: 'checked'
			},
			/**
			 * Private properties
			 */
			_state: {} as KTDataTableStateInterface,

			...config

		} as KTDataTableConfigInterface;
	}

	/**
	 * Initialize table, tbody, thead, info, size, and pagination elements
	 * @returns {void}
	 */
	private _initElements(): void {
		/**
		 * Data table element
		 */
		this._tableElement = this._element.querySelector<HTMLTableElement>(this._config.attributes.table)!;
		/**
		 * Table body element
		 */
		this._tbodyElement = this._tableElement.tBodies[0] || this._tableElement.createTBody();
		/**
		 * Table head element
		 */
		this._theadElement = this._tableElement.tHead!;
		/**
		 * Pagination info element
		 */
		this._infoElement = this._element.querySelector<HTMLElement>(this._config.attributes.info)!;
		/**
		 * Page size dropdown element
		 */
		this._sizeElement = this._element.querySelector<HTMLSelectElement>(this._config.attributes.size)!;
		/**
		 * Pagination element
		 */
		this._paginationElement = this._element.querySelector<HTMLElement>(this._config.attributes.pagination)!;
	}

	/**
	 * Fetch data from the server or from the DOM if `apiEndpoint` is not defined.
	 * @returns {Promise<void>} Promise which is resolved after data has been fetched and checkbox plugin initialized.
	 */
	private async _updateData(): Promise<void> {
		this._showSpinner(); // Show spinner before fetching data

		// Fetch data from the DOM and initialize the checkbox plugin
		return (typeof this._config.apiEndpoint === 'undefined')
			? this._fetchDataFromLocal().then(this._finalize.bind(this) as () => Promise<void>)
			: this._fetchDataFromServer().then(this._finalize.bind(this) as () => Promise<void>);
	}

	/**
	 * Finalize data table after data has been fetched
	 * @returns {void}
	 */
	private _finalize(): void {
		this._element.classList.add('datatable-initialized');

		const headerCheckElement = this._element.querySelector<HTMLInputElement>(this._config.attributes.check);
		if (headerCheckElement) {
			this._initChecbox(headerCheckElement);
		}

		this._attachSearchEvent();

		if (typeof KTComponents !== "undefined") {
			KTComponents.init();
		}

		/**
		 * Hide spinner
		 */
		this._hideSpinner();
	}

	/**
	 * Attach search event to the search input element
	 * @returns {void}
	 */
	private _attachSearchEvent(): void {
		const tableId: string = this._tableId();
		const searchElement: HTMLInputElement | null = document.querySelector<HTMLInputElement>(`[data-datatable-search="#${tableId}"]`);

		if (searchElement) {
			// Check if a debounced search function already exists
			if ((searchElement as any)._debouncedSearch) {
				// Remove the existing debounced event listener
				searchElement.removeEventListener('keyup', (searchElement as any)._debouncedSearch);
			}

			// Create a new debounced search function
			const debouncedSearch = this._debounce(() => {
				this.search(searchElement.value);
			}, this._config.search.delay);

			// Store the new debounced function as a property of the element
			(searchElement as any)._debouncedSearch = debouncedSearch;

			// Add the new debounced event listener
			searchElement.addEventListener('keyup', debouncedSearch);
		}
	}

	/**
	 * Initialize the checkbox plugin
	 * @param {HTMLInputElement} headerCheckElement - The header checkbox element
	 * @returns {void}
	 */
	private _initChecbox(headerCheckElement: HTMLInputElement): void {
		this._headerCheckElement = headerCheckElement;
		this._headerChecked = headerCheckElement.checked;

		this._targetElements = this._element.querySelectorAll(this._config.attributes.checkbox) as NodeListOf<HTMLInputElement>;

		this._checkboxHandler();
	}

	/**
	 * Fetch data from the DOM
	 * Fetch data from the table element and save it to the `originalData` state property.
	 * This method is used when the data is not fetched from the server via an API endpoint.
	 */
	private async _fetchDataFromLocal(): Promise<void> {
		const { sortField, sortOrder, page, pageSize, search } = this.getState();
		let { originalData } = this.getState();

		// If the table element or the original data is not defined, bail
		if (!this._tableElement || originalData === undefined || this._tableConfigInvalidate() || this._localTableHeaderInvalidate() || this._localTableContentInvalidate()) {
			this._deleteState();

			const { originalData, originalDataAttributes } = this._localExtractTableContent();

			this._config._state.originalData = originalData;
			this._config._state.originalDataAttributes = originalDataAttributes;
		}

		// Update the original data variable
		originalData = this.getState().originalData;

		// Clone the original data
		let _temp = this._data = [...originalData] as T[];

		if (search) {
			_temp = this._data = this._config.search.callback.call(this, this._data, search) as T[];
		}

		// If sorting is defined, sort the data
		if (sortField !== undefined && sortOrder !== undefined && sortOrder !== '') {
			if (typeof this._config.sort.callback === 'function') {
				this._data = this._config.sort.callback.call(this, this._data, sortField as string, sortOrder) as T[];
			}
		}

		// If there is data, slice it to the current page size
		if (this._data?.length > 0) {
			// Calculate the start and end indices for the current page
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;

			this._data = this._data.slice(startIndex, endIndex) as T[];
		}

		// Determine number of total rows
		this._config._state.totalItems = _temp.length;

		// Draw the data
		await this._draw();
	}

	/**
	 * Checks if the table content has been invalidated by comparing the current checksum of the table body
	 * with the stored checksum in the state. If the checksums are different, the state is updated with the
	 * new checksum and `true` is returned. Otherwise, `false` is returned.
	 *
	 * @returns {boolean} `true` if the table content has been invalidated, `false` otherwise.
	 */
	private _localTableContentInvalidate(): boolean {
		const checksum: string = KTUtils.checksum(JSON.stringify(this._tbodyElement.innerHTML));
		if (this.getState()._contentChecksum !== checksum) {
			this._config._state._contentChecksum = checksum;
			return true;
		}
		return false;
	}

	private _tableConfigInvalidate(): boolean {
		// Remove _data and _state from config
		const { _data, _state, ...restConfig } = this._config;
		const checksum: string = KTUtils.checksum(JSON.stringify(restConfig));
		if (_state._configChecksum !== checksum) {
			this._config._state._configChecksum = checksum;
			return true;
		}
		return false;
	}

	/**
	 * Extracts the table content and returns it as an object containing an array of original data and an array of original data attributes.
	 *
	 * @returns {{originalData: T[], originalDataAttributes: KTDataTableAttributeInterface[]}} - An object containing an array of original data and an array of original data attributes.
	 */
	private _localExtractTableContent(): { originalData: T[]; originalDataAttributes: KTDataTableAttributeInterface[]; } {
		const originalData: T[] = [];
		const originalDataAttributes: KTDataTableAttributeInterface[] = [];

		const rows = this._tbodyElement.querySelectorAll<HTMLTableRowElement>('tr');

		rows.forEach((row: HTMLTableRowElement) => {
			const dataRow: T = {} as T;
			const dataRowAttribute: KTDataTableAttributeInterface = {} as KTDataTableAttributeInterface;

			// Loop through each cell in the row
			row.querySelectorAll<HTMLTableCellElement>('td').forEach((td: HTMLTableCellElement, index: number) => {
				const attributes: { [key: string]: string; } = {};

				// Copy all attributes to the cell data
				Array.from(td.attributes).forEach((attr: Attr) => {
					attributes[attr.name] = attr.value;
				});

				// Set the data for the current row and cell
				dataRow[index as keyof T] = td.innerHTML?.trim() as T[keyof T];
				dataRowAttribute[index] = attributes;
			});

			// If the row has any data, add it to the original data array
			if (Object.keys(dataRow).length > 0) {
				originalData.push(dataRow);
				originalDataAttributes.push(dataRowAttribute);
			}
		});

		return { originalData, originalDataAttributes };
	}

	/**
	 * Check if the table header is invalidated
	 * @returns {boolean} - Returns true if the table header is invalidated, false otherwise
	 */
	private _localTableHeaderInvalidate(): boolean {
		const { originalData } = this.getState();
		const currentTableHeaders = this._getTableHeaders()?.length || 0;
		const totalColumns = originalData.length ? Object.keys(originalData[0]).length : 0;

		return currentTableHeaders !== totalColumns;
	}

	/**
	 * Fetch data from the server
	 */
	private async _fetchDataFromServer(): Promise<void> {
		this._fireEvent('fetch');
		this._dispatchEvent('fetch');

		const queryParams = this._getQueryParamsForFetchRequest();
		const response = await this._performFetchRequest(queryParams);

		let responseData = null;

		try {
			responseData = await response.json();
		} catch (error) {
			this._noticeOnTable('Error parsing API response as JSON: ' + String(error));
			return;
		}

		this._fireEvent('fetched', { response: responseData });
		this._dispatchEvent('fetched', { response: responseData });

		// Use the mapResponse function to transform the data if provided
		if (typeof this._config.mapResponse === 'function') {
			responseData = this._config.mapResponse.call(this, responseData);
		}

		this._data = responseData.data;

		this._config._state.totalItems = responseData.totalCount;

		await this._draw();
	}

	/**
	 * Get the query params for a fetch request
	 * @returns The query params for the fetch request
	 */
	private _getQueryParamsForFetchRequest(): URLSearchParams {
		// Get the current state of the datatable
		const { page, pageSize, sortField, sortOrder, filters, search } = this.getState();

		// Create a new URLSearchParams object to store the query params
		let queryParams = new URLSearchParams();

		// Add the current page number and page size to the query params
		queryParams.set('page', String(page));
		queryParams.set('size', String(pageSize));

		// If there is a sort order and field set, add them to the query params
		if (sortOrder !== undefined) {
			queryParams.set('sortOrder', String(sortOrder));
		}

		if (sortField !== undefined) {
			queryParams.set('sortField', String(sortField));
		}

		// If there are any filters set, add them to the query params
		if (Array.isArray(filters) && filters.length) {
			queryParams.set('filters', JSON.stringify(filters.map((filter: KTDataTableColumnFilterInterface) => ({
				// Map the filter object to a simpler object with just the necessary properties
				column: filter.column,
				type: filter.type,
				value: filter.value,
			}))));
		}

		if (search) {
			queryParams.set('search', typeof search === 'object' ? JSON.stringify(search) : search);
		}

		// If a mapRequest function is provided, call it with the query params object
		if (typeof this._config.mapRequest === 'function') {
			queryParams = this._config.mapRequest.call(this, queryParams);
		}

		// Return the query params object
		return queryParams;
	}


	private async _performFetchRequest(queryParams: URLSearchParams): Promise<Response> {
		let requestMethod: RequestInit['method'] = this._config.requestMethod;
		let requestBody: RequestInit['body'] | undefined = undefined;

		// If the request method is POST, send the query params as the request body
		if (requestMethod === 'POST') {
			requestBody = queryParams;
		} else if (requestMethod === 'GET') {
			// If the request method is GET, append the query params to the API endpoint
			const apiEndpointWithQueryParams = new URL(this._config.apiEndpoint);
			apiEndpointWithQueryParams.search = queryParams.toString();
			this._config.apiEndpoint = apiEndpointWithQueryParams.toString();
		}

		return fetch(this._config.apiEndpoint, {
			method: requestMethod,
			body: requestBody,
			headers: this._config.requestHeaders
		}).catch(error => {
			this._noticeOnTable('Error performing fetch request: ' + String(error));
			throw error;
		});
	}

	/**
	 * Update the table and pagination controls with new data
	 * @returns {Promise<void>} A promise that resolves when the table and pagination controls are updated
	 */
	private async _draw(): Promise<void> {
		this._config._state.totalPages = Math.ceil(this.getState().totalItems / this.getState().pageSize) || 0;

		this._fireEvent('draw');
		this._dispatchEvent('draw');

		this._dispose();

		// Update the table and pagination controls
		if (this._theadElement && this._tbodyElement) {
			this._updateTable();
		}

		if (this._infoElement && this._paginationElement) {
			this._updatePagination();
		}

		this._fireEvent('drew');
		this._dispatchEvent('drew');

		this._hideSpinner(); // Hide spinner after data is fetched

		if (this._config.stateSave) {
			this._saveState();
		}
	}

	/**
	 * Update the HTML table with new data
	 * @returns {HTMLTableSectionElement} The new table body element
	 */
	private _updateTable(): HTMLTableSectionElement {
		// Clear the existing table contents using a more efficient method
		while (this._tableElement.tBodies.length) {
			this._tableElement.removeChild(this._tableElement.tBodies[0]);
		}

		// Create the table body with the new data
		const tbodyElement = this._tableElement.createTBody() as HTMLTableSectionElement;

		this._updateTableContent(tbodyElement);

		return tbodyElement;
	}

	/**
	 * Initialize the table header
	 * Add sort event listener to all sortable columns
	 */
	private _initTableHeader(): void {
		if (!this._theadElement) {
			return;
		}

		// Set the initial sort icon
		this._setSortIcon(this.getState().sortField, this.getState().sortOrder);

		// Get all the table headers
		const headers = this._getTableHeaders();

		// Loop through each table header
		headers.forEach(header => {
			// If the sort class is not found, it's not a sortable column
			if (!header.querySelector(`.${this._config.sort.classes.base}`)) {
				return;
			}

			const sortAttribute = header.getAttribute('data-datatable-column-sort') || header.getAttribute('data-datatable-column');
			const sortField = sortAttribute ? (sortAttribute as keyof T) : header.cellIndex as keyof T;

			// Add click event listener to the header
			header.addEventListener('click', () => {
				const sortOrder = this._toggleSortOrder(sortField);

				this._setSortIcon(sortField, sortOrder);
				this._sort(sortField);
			});
		});
	}

	/**
	 * Returns an array of table headers as HTMLTableCellElement.
	 * @returns {HTMLTableCellElement[]} An array of table headers.
	 */
	private _getTableHeaders(): HTMLTableCellElement[] {
		if (!this._theadElement) {
			return [];
		}
		return Array.from(this._theadElement.querySelectorAll('th')) as HTMLTableCellElement[];
	}

	/**
	 * Sets the sort icon in the table header
	 * @param sortField The field to set the sort icon for
	 * @param sortOrder The sort order (ascending or descending)
	 */
	private _setSortIcon(sortField: keyof T, sortOrder: KTDataTableSortOrderInterface): void {

		const sortClass = sortOrder ? (sortOrder === 'asc' ? this._config.sort.classes.asc : this._config.sort.classes.desc) : '';

		// Get the appropriate table header element
		const th = typeof sortField === 'number'
			? this._theadElement.querySelectorAll('th')[sortField]
			: this._theadElement.querySelector(`th[data-datatable-column="${String(sortField)}"], th[data-datatable-column-sort="${String(sortField)}"]`) as HTMLElement;

		if (th) {
			const sortElement = th.querySelector(`.${this._config.sort.classes.base}`) as HTMLElement;

			if (sortElement) {
				sortElement.className = `${this._config.sort.classes.base} ${sortClass}`.trim();
			}
		}
	}

	/**
	 * Toggles the sort order of a column
	 * @param sortField The field to toggle the sort order for
	 * @returns The new sort order (ascending, descending or unsorted)
	 */
	private _toggleSortOrder(sortField: keyof T | number): KTDataTableSortOrderInterface {
		// If the sort field is the same as the current sort field,
		// toggle the sort order. Otherwise, set the sort order to ascending.
		return (() => {
			if (this.getState().sortField === sortField) {
				switch (this.getState().sortOrder) {
					case 'asc':
						return 'desc'; // Descending
					case 'desc':
						return ''; // Unsorted
					default:
						return 'asc'; // Ascending
				}
			}
			return 'asc'; // Ascending
		})();
	}

	/**
	 * Update the table content
	 * @param tbodyElement The table body element
	 * @returns {HTMLTableSectionElement} The updated table body element
	 */
	private _updateTableContent(tbodyElement: HTMLTableSectionElement): HTMLTableSectionElement {
		const fragment = document.createDocumentFragment();

		tbodyElement.textContent = ''; // Clear the tbody element

		if (this._data.length === 0) {
			this._noticeOnTable(this._config.infoEmpty || '');
			return tbodyElement;
		}

		this._data.forEach((item: T, rowIndex: number) => {
			const row = document.createElement('tr');

			if (!this._config.columns) {
				const dataRowAttributes = this.getState().originalDataAttributes
					? this.getState().originalDataAttributes[rowIndex]
					: null;

				Object.keys(item).forEach((key: keyof T | number, colIndex: number) => {
					const td = document.createElement('td');
					td.innerHTML = item[key] as string;

					if (dataRowAttributes) {
						for (const attr in dataRowAttributes[colIndex]) {
							td.setAttribute(attr, dataRowAttributes[colIndex][attr]);
						}
					}

					row.appendChild(td);
				});
			} else {
				Object.keys(this._config.columns).forEach((key: keyof T) => {
					const td = document.createElement('td');
					const columnDef = this._config.columns[key as string];

					if (typeof columnDef.render === 'function') {
						td.innerHTML = columnDef.render.call(this, item[key] as string, item, this) as string;
					} else {
						td.textContent = item[key] as string;
					}

					if (typeof columnDef.createdCell === 'function') {
						columnDef.createdCell.call(this, td, item[key], item, row);
					}

					row.appendChild(td);
				});
			}

			fragment.appendChild(row);
		});

		tbodyElement.appendChild(fragment);
		return tbodyElement;
	}

	/**
	 * Show a notice on the table
	 * @param message The message to show. If empty, the message will be removed
	 * @returns {void}
	 */
	private _noticeOnTable(message: string = ''): void {
		const row = this._tbodyElement.insertRow();
		const cell = row.insertCell();
		cell.colSpan = this._getTableHeaders()?.length || 0;
		cell.innerHTML = message;
	}

	private _updatePagination(): void {
		this._removeChildElements(this._sizeElement);
		this._createPageSizeControls(this._sizeElement);

		this._removeChildElements(this._paginationElement);
		this._createPaginationControls(this._infoElement, this._paginationElement);
	}

	/**
	 * Removes all child elements from the given container element.
	 * @param container The container element to remove the child elements from.
	 */
	private _removeChildElements(container: HTMLElement): void {
		if (!container) {
			return;
		}

		// Loop through all child elements of the container and remove them one by one
		while (container.firstChild) {
			// Remove the first child element (which is the first element in the list of child elements)
			container.removeChild(container.firstChild);
		}
	}

	/**
	 * Creates a container element for the items per page selector.
	 * @param _sizeElement The element to create the page size controls in.
	 * @returns The container element.
	 */
	private _createPageSizeControls(_sizeElement: HTMLSelectElement): HTMLSelectElement {
		// If no element is provided, return early
		if (!_sizeElement) {
			return _sizeElement;
		}

		// Create <option> elements for each page size option
		const options = this._config.pageSizes.map((size: number) => {
			const option = document.createElement('option') as HTMLOptionElement;
			option.value = String(size);
			option.text = String(size);
			option.selected = this.getState().pageSize === size;
			return option;
		});

		// Add the <option> elements to the provided element
		_sizeElement.append(...options);

		// Create an event listener for the "change" event on the element
		const _pageSizeControlsEvent = (event: Event) => {
			// When the element changes, reload the page with the new page size and page number 1
			this._reloadPageSize(Number((event.target as HTMLSelectElement).value), 1);
		};

		// Bind the event listener to the component instance
		_sizeElement.onchange = _pageSizeControlsEvent.bind(this);

		// Return the element
		return _sizeElement;
	}

	/**
	 * Reloads the data with the specified page size and optional page number.
	 * @param pageSize The new page size.
	 * @param page The new page number (optional, defaults to 1).
	 */
	private _reloadPageSize(pageSize: number, page: number = 1): void {
		// Update the page size and page number in the state
		this._config._state.pageSize = pageSize;
		this._config._state.page = page;

		// Update the data with the new page size and page number
		this._updateData();
	}

	/**
	 * Creates the pagination controls for the component.
	 * @param _infoElement The element to set the info text in.
	 * @param _paginationElement The element to create the pagination controls in.
	 * @return {HTMLElement} The element containing the pagination controls.
	 */
	private _createPaginationControls(_infoElement: HTMLElement, _paginationElement: HTMLElement): HTMLElement {
		if (!_infoElement || !_paginationElement || this._data.length === 0) {
			return null;
		}

		this._setPaginationInfoText(_infoElement);
		const paginationContainer = this._createPaginationContainer(_paginationElement);

		if (paginationContainer) {
			this._createPaginationButtons(paginationContainer);
		}

		return paginationContainer;
	}

	/**
	 * Sets the info text for the pagination controls.
	 * @param _infoElement The element to set the info text in.
	 */
	private _setPaginationInfoText(_infoElement: HTMLElement): void {
		_infoElement.textContent = this._config.info
			.replace('{start}', (this.getState().page - 1) * this.getState().pageSize + 1 + '')
			.replace('{end}', Math.min(this.getState().page * this.getState().pageSize, this.getState().totalItems) + '')
			.replace('{total}', this.getState().totalItems + '');
	}

	/**
	 * Creates the container element for the pagination controls.
	 * @param _paginationElement The element to create the pagination controls in.
	 * @return {HTMLElement} The container element.
	 */
	private _createPaginationContainer(_paginationElement: HTMLElement): HTMLElement {
		const paginationContainer = document.createElement('div');
		paginationContainer.className = 'pagination';
		_paginationElement.appendChild(paginationContainer);

		return paginationContainer;
	}

	/**
	 * Creates the pagination buttons for the component.
	 * @param paginationContainer The container element for the pagination controls.
	 */
	private _createPaginationButtons(paginationContainer: HTMLElement): void {
		const { page: currentPage, totalPages } = this.getState();
		const { previous, next, number, more } = this._config.pagination;

		// Helper function to create a button
		const createButton = (text: string, className: string, disabled: boolean, handleClick: () => void): HTMLButtonElement => {
			const button = document.createElement('button') as HTMLButtonElement;
			button.className = className;
			button.innerHTML = text;
			button.disabled = disabled;
			button.onclick = handleClick;
			return button;
		};

		// Add Previous Button
		paginationContainer.appendChild(
			createButton(previous.text, `${previous.class}${currentPage === 1 ? ' disabled' : ''}`, currentPage === 1, () => this._paginateData(currentPage - 1))
		);

		// Calculate range of pages
		const pageMoreEnabled = this._config.pageMore;

		if (pageMoreEnabled) {
			const maxButtons = this._config.pageMoreLimit;
			const range = this._calculatePageRange(currentPage, totalPages, maxButtons);

			// Add start ellipsis
			if (range.start > 1) {
				paginationContainer.appendChild(createButton(more.text, more.class, false, () => this._paginateData(Math.max(1, range.start - 1))));
			}

			// Add page buttons
			for (let i = range.start; i <= range.end; i++) {
				paginationContainer.appendChild(
					createButton(number.text.replace('{page}', i.toString()), `${number.class}${currentPage === i ? ' active disabled' : ''}`, currentPage === i, () => this._paginateData(i))
				);
			}

			// Add end ellipsis
			if (pageMoreEnabled && range.end < totalPages) {
				paginationContainer.appendChild(createButton(more.text, more.class, false, () => this._paginateData(Math.min(totalPages, range.end + 1))));
			}
		} else {
			// Add page buttons
			for (let i = 1; i <= totalPages; i++) {
				paginationContainer.appendChild(
					createButton(number.text.replace('{page}', i.toString()), `${number.class}${currentPage === i ? ' active disabled' : ''}`, currentPage === i, () => this._paginateData(i))
				);
			}
		}

		// Add Next Button
		paginationContainer.appendChild(
			createButton(next.text, `${next.class}${currentPage === totalPages ? ' disabled' : ''}`, currentPage === totalPages, () => this._paginateData(currentPage + 1))
		);
	}

	// New helper method to calculate page range
	private _calculatePageRange(currentPage: number, totalPages: number, maxButtons: number): { start: number, end: number } {
		let startPage: number, endPage: number;
		const halfMaxButtons = Math.floor(maxButtons / 2);

		if (totalPages <= maxButtons) {
			startPage = 1;
			endPage = totalPages;
		} else {
			startPage = Math.max(currentPage - halfMaxButtons, 1);
			endPage = Math.min(startPage + maxButtons - 1, totalPages);
			if (endPage - startPage < maxButtons - 1) {
				startPage = Math.max(endPage - maxButtons + 1, 1);
			}
		}

		return { start: startPage, end: endPage };
	}

	/**
	 * Method for handling pagination
	 * @param page - The page number to navigate to
	 */
	private _paginateData(page: number): void {
		if (page < 1 || !Number.isInteger(page)) {
			return;
		}

		this._fireEvent('pagination', { page: page });
		this._dispatchEvent('pagination', { page: page });

		if (page >= 1 && page <= this.getState().totalPages) {
			this._config._state.page = page;
			this._updateData();
		}
	}

	// Method to show the loading spinner
	private _showSpinner(): void {
		const spinner = this._element.querySelector<HTMLElement>(this._config.attributes.spinner) || this._createSpinner();
		if (spinner) {
			spinner.style.display = 'block';
		}
		this._element.classList.add('loading');
	}

	// Method to hide the loading spinner
	private _hideSpinner(): void {
		const spinner = this._element.querySelector<HTMLElement>(this._config.attributes.spinner);
		if (spinner) {
			spinner.style.display = 'none';
		}
		this._element.classList.remove('loading');
	}

	// Method to create a spinner element if it doesn't exist
	private _createSpinner(): HTMLElement {
		if (typeof this._config.loading === 'undefined') {
			return null;
		}

		const template = document.createElement('template');
		template.innerHTML = this._config.loading.template.trim().replace('{content}', this._config.loading.content);
		const spinner = template.content.firstChild as HTMLElement;
		spinner.setAttribute('data-datatable-spinner', 'true');

		this._tableElement.appendChild(spinner);

		return spinner;
	}

	/**
	 * Saves the current state of the table to local storage.
	 * @returns {void}
	 */
	private _saveState(): void {
		this._fireEvent('stateSave');
		this._dispatchEvent('stateSave');

		const ns: string = this._tableNamespace();

		if (ns) {
			localStorage.setItem(ns, JSON.stringify(this.getState() as KTDataTableStateInterface));
		}
	}

	/**
	 * Loads the saved state of the table from local storage, if it exists.
	 * @returns {Object} The saved state of the table, or null if no saved state exists.
	 */
	private _loadState(): KTDataTableStateInterface | null {
		const stateString = localStorage.getItem(this._tableNamespace());
		if (!stateString) return null;

		try {
			const state = JSON.parse(stateString) as KTDataTableStateInterface;
			if (state) this._config._state = state;
			return state;
		} catch { } // eslint-disable-line no-empty

		return null;
	}

	private _deleteState(): void {
		const ns = this._tableNamespace();

		if (ns) {
			localStorage.removeItem(ns);
		}
	}

	/**
	 * Gets the namespace for the table's state.
	 * If a namespace is specified in the config, it is used.
	 * Otherwise, if the table element has an ID, it is used.
	 * Otherwise, if the component element has an ID, it is used.
	 * Finally, the component's UID is used.
	 * @returns {string} The namespace for the table's state.
	 */
	private _tableNamespace(): string {
		// Use the specified namespace, if one is given
		if (this._config.stateNamespace) {
			return this._config.stateNamespace;
		}

		// Fallback to the component's UID
		return this._tableId() ?? this._name;
	}

	private _tableId(): string {
		let id: string = null;
		// If the table element has an ID, use that
		if (this._tableElement?.getAttribute('id')) {
			id = this._tableElement.getAttribute('id') as string;
		}

		// If the component element has an ID, use that
		if (this._element?.getAttribute('id')) {
			id = this._element.getAttribute('id') as string;
		}

		return id;
	}

	/**
	 * Sorts the data in the table by the specified field.
	 * @param sortField The field to sort by.
	 */
	private _sort(sortField: keyof T | number): void {
		// Determine the new sort order based on the current state
		const newSortOrder = this._toggleSortOrder(sortField);

		// Update the current sort field and order
		this._config._state.sortField = sortField as never;
		this._config._state.sortOrder = newSortOrder;

		this._fireEvent('sort', { field: sortField, order: newSortOrder });
		this._dispatchEvent('sort', { field: sortField, order: newSortOrder });

		// Fetch data from the server with the new sort order
		this._updateData();
	}

	private _dispose() {
		if (this._headerCheckElement) {
			this._headerCheckElement.removeEventListener('click', this._checkboxListener);
		}
	}

	private _debounce(func: Function, wait: number) {
		let timeout: number | undefined;
		return function (...args: any[]) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = window.setTimeout(later, wait);
		};
	}

	/**
	 * Event handlers
	 */
	protected _checkboxHandler(): void {
		// Handle header checkbox change event
		this._headerCheckElement.addEventListener('click', this._checkboxListener);

		// Handle target checbox change event
		KTEventHandler.on(
			document.body,
			this._config.attributes.checkbox,
			'input',
			(event: Event) => {
				this._checkboxUpdate(event as InputEvent); // Update checkbox state based on checked rows
			}
		);
	}

	/**
	 * Checks if element is checked
	 * @returns {boolean}
	 */
	protected _isChecked(): boolean {
		return this._headerChecked;
	}

	/**
	 * Change checkbox state
	 * @param checked The new state of the checkbox
	 * @returns {void}
	 */
	protected _change(checked: boolean): void {
		const payload: KTDatatableCheckChangePayloadInterface = { cancel: false };

		this._fireEvent('change', payload);
		this._dispatchEvent('change', payload);

		if (payload.cancel === true) {
			return;
		}

		this._headerChecked = checked;
		this._headerCheckElement.checked = checked;

		if (this._targetElements) {
			this._targetElements.forEach((element: HTMLInputElement) => {
				if (element) {
					element.checked = checked;
				}
			});
		}

		this._fireEvent('changed');
		this._dispatchEvent('changed');
	}

	/**
	 * Toggle checkbox state
	 * @param event The event if available
	 * @returns {void}
	 */
	protected _checkboxToggle(event?: Event): void {
		const checked = !this._isChecked();

		const eventType = checked ? 'checked' : 'unchecked';

		this._fireEvent(eventType);
		this._dispatchEvent(eventType);

		this._change(checked);
	}

	/**
	 * Update checkbox state based on checked rows
	 * @param event The event if available
	 * @returns {void}
	 */
	protected _checkboxUpdate(event?: Event): void {
		let checked = 0;
		const total = this._targetElements.length;

		for (let i = 0; i < total; i++) {
			const element = this._targetElements[i];
			if (!element) {
				continue;
			}

			const row = element.closest('tr');
			if (!row) {
				continue;
			}

			if (element.checked) {
				row.classList.add(this._config.checkbox.checkedClass as string);
				checked++;
			} else {
				row.classList.remove(this._config.checkbox.checkedClass as string);
			}
		}

		if (checked === 0) {
			this._headerCheckElement.indeterminate = false;
			this._change(false);
		}

		if (checked > 0 && checked < total) {
			this._headerCheckElement.indeterminate = true;
		}

		if (checked === total) {
			this._headerCheckElement.indeterminate = false;
			this._change(true);
		}
	}

	/**
	 * Get checked row IDs
	 * @returns {string[]} An array of checked row IDs
	 */
	protected _getChecked(): string[] {
		const checked: string[] = [];

		this._targetElements.forEach((element: HTMLInputElement | null) => {
			if (element && element.checked) {
				const value = element.value;
				if (value) {
					checked.push(value);
				}
			}
		});

		return checked;
	}

	public isChecked(): boolean {
		return this._isChecked();
	}

	public toggle(): void {
		this._checkboxToggle();
	}

	/**
	 * Check all rows
	 * @returns {void}
	 */
	public check(): void {
		this._change(true as boolean);
		this._checkboxUpdate();
	}

	/**
	 * Uncheck all rows
	 * @returns {void}
	 */
	public uncheck(): void {
		this._change(false as boolean);
	}

	/**
	 * Get checked row IDs
	 * @returns {string[]} An array of checked row IDs
	 */
	public getChecked(): string[] {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return this._getChecked() as any;
	}

	public update(): void {
		this._checkboxUpdate();
	}

	/**
	 * Gets the current state of the table.
	 * @returns {KTDataTableStateInterface} The current state of the table.
	 */
	public getState(): KTDataTableStateInterface {
		return {
			/**
			 * The current page number.
			 */
			page: 1,
			/**
			 * The field that the data is sorted by.
			 */
			sortField: null,
			/**
			 * The sort order (ascending or descending).
			 */
			sortOrder: '',
			/**
			 * The number of rows to display per page.
			 */
			pageSize: this._config.pageSize,

			filters: [],

			/**
			 * Any additional state that may have been stored in the config.
			 */
			...this._config._state
		};
	}

	/**
	 * Sorts the data in the table by the specified field.
	 * @param field The field to sort by.
	 */
	public sort(field: keyof T | number): void {
		// Sort the data
		this._sort(field);
	}

	/**
	 * Navigates to the specified page in the data table.
	 * @param page The page number to navigate to.
	 */
	public goPage(page: number): void {
		if (page < 1 || !Number.isInteger(page)) {
			return;
		}

		// Navigate to the specified page
		this._paginateData(page);
	}

	/**
	 * Set the page size of the data table.
	 * @param pageSize The new page size.
	 */
	public setPageSize(pageSize: number): void {
		if (!Number.isInteger(pageSize)) {
			return;
		}

		/**
		 * Reload the page size of the data table.
		 * @param pageSize The new page size.
		 */
		this._reloadPageSize(pageSize);
	}

	/**
	 * Reloads the data from the server and updates the table.
	 * Triggers the 'reload' event and the 'kt.datatable.reload' custom event.
	 */
	public reload(): void {
		this._fireEvent('reload');
		this._dispatchEvent('reload');

		// Fetch the data from the server using the current sort and filter settings
		this._updateData();
	}

	public redraw(page: number = 1): void {
		this._fireEvent('redraw');
		this._dispatchEvent('redraw');

		this._paginateData(page);
	}

	/**
	 * Show the loading spinner of the data table.
	 */
	public showSpinner(): void {
		/**
		 * Show the loading spinner of the data table.
		 */
		this._showSpinner();
	}

	/**
	 * Hide the loading spinner of the data table.
	 */
	public hideSpinner(): void {
		/**
		 * Hide the loading spinner of the data table.
		 */
		this._hideSpinner();
	}

	/**
	 * Filter data using the specified filter object.
	 * Replaces the existing filter object for the column with the new one.
	 * @param filter Filter object containing the column name and its value.
	 * @returns The KTDataTable instance.
	 * @throws Error if the filter object is null or undefined.
	 */
	public setFilter(filter: KTDataTableColumnFilterInterface): KTDataTable<T> {
		this._config._state.filters = [
			...(this.getState().filters || []).filter(f => f.column !== filter.column),
			filter
		];
		return this;
	}

	public override dispose(): void {
		this._dispose();
	}

	public search(query: string | object): void {
		this._config._state.search = query;
		this.reload();
	}

	/**
	 * Static variables
	 */
	private static _instances = new Map<HTMLElement, KTDataTable<KTDataTableDataInterface>>();

	/**
	 * Create KTDataTable instances for all elements with a data-datatable="true" attribute.
	 *
	 * This function should be called after the control(s) have been
	 * loaded and parsed by the browser. It will create instances of
	 * KTDataTable for all elements with a data-datatable="true" attribute.
	 */
	public static createInstances(): void {
		const elements = document.querySelectorAll<HTMLElement>('[data-datatable="true"]');

		elements.forEach((element) => {
			if (element.hasAttribute('data-datatable') && !element.classList.contains('datatable-initialized')) {
				/**
				 * Create an instance of KTDataTable for the given element
				 * @param element The element to create an instance for
				 */
				const instance = new KTDataTable(element);
				this._instances.set(element, instance);
			}
		});
	}

	/**
	 * Get the KTDataTable instance for a given element.
	 *
	 * @param element The element to retrieve the instance for
	 * @returns The KTDataTable instance or undefined if not found
	 */
	public static getInstance(element: HTMLElement): KTDataTable<KTDataTableDataInterface> | undefined {
		return this._instances.get(element);
	}

	/**
	 * Initializes all KTDataTable instances on the page.
	 *
	 * This function should be called after the control(s) have been
	 * loaded and parsed by the browser.
	 */
	public static init(): void {
		// Create instances of KTDataTable for all elements with a
		// data-datatable="true" attribute
		KTDataTable.createInstances();
	}

	// Other plugin methods can be added here
}
