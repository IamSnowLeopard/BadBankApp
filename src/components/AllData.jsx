import { useUserActivities } from "./UserActivitiesContext";

const AllData = () => {
  const { activities } = useUserActivities();

  return (
    <div
      className="card mx-auto"
      style={{ maxWidth: "600px", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">All User Activities</h5>
        <div className="card-text">
          {activities.length > 0 ? (
            <ul className="list-group">
              {activities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  {activity.type}: {activity.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllData;
