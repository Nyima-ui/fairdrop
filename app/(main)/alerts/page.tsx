"use client";
import Search from "../../components/Search";
import SetAlertForm from "../../components/SetAlertForm";
import ActiveAlerts from "../../components/ActiveAlerts";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { AlertProps } from "@/types/component";
import EditAlert from "@/app/components/EditAlert";

const AlertSettingPage = () => {
  const [activeAlerts, setActiveAlerts] = useState<AlertProps[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

  const fetchActiveAlerts = useCallback(async () => {
    try {
      if (!userId) return;

      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("price_alerts")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      setActiveAlerts(data);
    } catch (error) {
      console.error("Error fetching active alerts", error);
      setError(
        error instanceof Error
          ? error.message
          : "Error fetching active alerts.",
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchActiveAlerts();
  }, [fetchActiveAlerts]);

  useEffect(() => {
    // console.log(isEditing);
  }, [isEditing]);
  return (
    <div>
      <div className="max-w-211.5 mx-auto">
        <Search />
      </div>
      <main className="max-w-7xl mx-auto py-15 max-sm:py-11.25 flex justify-between gap-7.5 max-md:flex-col">
        <div className="">
          <h1 className="text-4xl">
            {isEditing ? "Update your price alert" : "Setup your price alert"}
          </h1>
          {isEditing ? (
            <EditAlert
              alert={selectedAlert}
              setActiveAlerts={setActiveAlerts}
              setIsEditing={setIsEditing}
            />
          ) : (
            <SetAlertForm fetchActiveAlerts={fetchActiveAlerts} />
          )}
        </div>
        <div className="max-w-118.75 flex-1">
          <h2 className="text-4xl">Your active alerts</h2>
          <ul className="mt-5 space-y-5">
            {loading && (
              <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
            )}
            {!loading && error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            {!loading && !error && activeAlerts.length === 0 && (
              <p>No active alerts.</p>
            )}
            {!loading &&
              !error &&
              activeAlerts.length > 0 &&
              activeAlerts.map((alert) => (
                <ActiveAlerts
                  key={alert.alert_id}
                  alert={alert}
                  setIsEditing={setIsEditing}
                  setSelectedAlert={setSelectedAlert}
                  fetchActiveAlerts={fetchActiveAlerts}
                />
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AlertSettingPage;
