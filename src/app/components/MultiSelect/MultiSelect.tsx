import { useEffect, useRef, useState } from "react";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import { FcCheckmark } from "react-icons/fc";
import { MdArrowDropDown } from "react-icons/md";

interface OptionType {
  label: string;
  value: number;
}

interface MultiSelectProps {
  options: OptionType[];
  displayValue: string;
  placeholder: string;
  selectedValues: number[];
  onRemove: (selectedList: OptionType[]) => void;
  onSelect: (selectedList: OptionType[]) => void;
  setSearch?: (search: string) => void;
  search?: string;
  isSearchInput?: boolean;
  className?: string;
  sliceCount?: number;
  isCustomLabel?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  displayValue,
  placeholder,
  selectedValues,
  onRemove,
  onSelect,
  setSearch,
  search = "",
  isSearchInput = true,
  className = "",
  sliceCount = 1,
  isCustomLabel = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(search);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setSearchValue("");
    if (setSearch) {
      setSearch("");
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectOption = (option: OptionType) => {
    const updatedFilter = selectedValues.includes(option.value)
      ? selectedValues.filter((id) => id !== option.value)
      : [...selectedValues, option.value];

    const updatedOptions = options.filter((opt) =>
      updatedFilter.includes(opt.value)
    );

    if (selectedValues.includes(option.value)) {
      onRemove(updatedOptions);
    } else {
      onSelect(updatedOptions);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (setSearch) {
      setSearch(value);
    }
  };

  const searchTerm = search || searchValue;

  const filteredOptions = isSearchInput
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showNoResults = filteredOptions.length === 0 && options.length > 0;
  const showNoCustomers = searchTerm && options.length === 0;

  return (
    <div className={`multi-select-container ${className}`} ref={dropdownRef}>
      <div className="multi-select" onClick={toggleDropdown}>
        {selectedValues?.length === 0 ? (
          <span className="placeholder">{placeholder}</span>
        ) : (
          <div className="selected-options">
            {options?.length > 0
              ? options
                  .filter((option) => selectedValues?.includes(option.value))
                  .slice(0, sliceCount)
                  .map((option) => (
                    <span key={option.value} className="selected-option">
                      {option.label}
                    </span>
                  ))
              : null}
            {selectedValues?.length > sliceCount && (
              <span className="selected-option">
                +{selectedValues.length - sliceCount}
              </span>
            )}
          </div>
        )}
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          {isSearchInput && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const adminStatusClass = getOrderStatusLabel(option.label, true);

                return isCustomLabel ? (
                  <li
                    key={option.value}
                    className={`dropdown-item ${adminStatusClass} ${
                      selectedValues?.includes(option.value) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <span>{option.label}</span>
                    {selectedValues?.includes(option.value) && (
                      <span className="checkmark">
                        <FcCheckmark size={18} />
                      </span>
                    )}
                  </li>
                ) : (
                  <li
                    key={option.value}
                    className={`dropdown-item ${
                      selectedValues?.includes(option.value) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <span>{option.label}</span>
                    {selectedValues?.includes(option.value) && (
                      <span className="checkmark">
                        <FcCheckmark size={18} />
                      </span>
                    )}
                  </li>
                );
              })
            ) : showNoCustomers ? (
              <li className="no-search">No customers found</li>
            ) : showNoResults ? (
              <li className="no-search">No results match</li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
