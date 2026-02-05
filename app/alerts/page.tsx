import React from "react";
import Search from "../components/Search";
import SetAlertForm from "../components/SetAlertForm";

const AlertSettingPage = () => {
  return (
    <div>
      <div className="max-w-211.5 mx-auto">
        <Search />
      </div>
      <main className="max-w-7xl mx-auto border py-15 max-sm:py-11.25">
        <div>
          <h1 className="text-4xl">Setup your price alert</h1>
          <SetAlertForm />
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default AlertSettingPage;
