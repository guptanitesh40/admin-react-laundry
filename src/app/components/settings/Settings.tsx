import GeneralSettings from "./GeneralSettings";
import PromotionBanner from "./PromotionBanner";

const Settings: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Settings
            </h1>
          </div>
        </div>
      </div>
      <div className="container-fixed">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
          <GeneralSettings />
          <PromotionBanner />
        </div>
      </div>
    </>
  );
};

export default Settings;
