import {GetApiV1ActivitiesResponse, useApi} from "./hooks/useApi.ts";
import {useEffect, useState} from "react";

function App() {
  const api = useApi();
  const [activities, setActivities] = useState<GetApiV1ActivitiesResponse>();
  const [loading, setLoading] = useState(false);

  async function deleteActivity(id: number) {
    try {
      setLoading(true);

      await api.deleteApiV1ActivitiesById({path: {id}});

      setActivities((current) => {
        if (!current) return current;
        return current.filter(activity => activity.id !== id);
      });
    } catch {
      console.error("Failed to delete activity");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activities) return;

    (async () => {
      const { data } = await api.getApiV1Activities();
      setActivities(data);
    })()
  }, [activities]);

  if (activities && activities.length) {
    return (
      <ul>
        {activities.map((activity) => {
          const onDelete = () => deleteActivity(activity.id as number);

          return (
            <li key={activity.id}>
              {activity.title}
              <hr/>
              <button onClick={onDelete} disabled={loading}>Delete</button>
            </li>
          );
        })}
      </ul>
    )
  }

  return <div>Hello</div>
}

export default App
