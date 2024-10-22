import { useSelector } from "react-redux";
import './UsersCorousel.css'

const UsersCorousel = () => {
  const users = useSelector(state => state.usersReducer);
  const dupli = [...users, ...users];
  return (
    <>
      <div className="corousel-container">
        <div className="corousel-wrapper">
          {dupli.map((user, index) => (
            <div className="corousel-names" key={index}>{user.name}</div>
          ))}
        </div>
      </div>
    </>
  );
};


export default UsersCorousel