import React from "react";
import Search from "../../components/Search";
import SetAlertForm from "../../components/SetAlertForm";
import ActiveAlerts from "../../components/ActiveAlerts";

const AlertSettingPage = () => {
  return (
    <div>
      <div className="max-w-211.5 mx-auto">
        <Search />
      </div>
      <main className="max-w-7xl mx-auto py-15 max-sm:py-11.25 flex justify-between gap-7.5 max-md:flex-col">
        <div className="">
          <h1 className="text-4xl">Setup your price alert</h1>
          <SetAlertForm />
        </div>
        <div className="max-w-118.75 flex-1">
          <h2 className="text-4xl">You active alerts</h2>
          <ul className="mt-5">
            <ActiveAlerts />
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AlertSettingPage;
