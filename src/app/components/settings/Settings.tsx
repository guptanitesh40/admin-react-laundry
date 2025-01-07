import GeneralSettings from "./GeneralSettings";
import PromotionBanner from "./PromotionBanner";

const Settings: React.FC = () => {
  return (
    <div className="container-fixed">
      <h1 className="text-xl font-semibold leading-none text-gray-900">
        Settings
      </h1>
      <div className="flex flex-row w-full gap-8 mt-5">
        <GeneralSettings />
        <PromotionBanner />
      </div>
    </div>
  );
};

export default Settings;
