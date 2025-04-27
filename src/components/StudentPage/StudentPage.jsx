import { useEffect, useState } from "react";
import avatar1 from "../../assets/xyz.jpg";
import "./StudentPage.css";

export default function StudentPage({
  selectedLanguages = [],
  selectedSoftSkills = [],
}) {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsUsersLoading(true);
      let url = `http://localhost:3001/users?page=1&limit=200`;

      const queryParams = [];

      if (selectedLanguages.length > 0) {
        queryParams.push(
          `langs=${selectedLanguages.map((l) => l.toLowerCase()).join(",")}`
        );
      }

      if (selectedSoftSkills.length > 0) {
        queryParams.push(`softSkills=${selectedSoftSkills.join(",")}`);
      }

      if (queryParams.length > 0) {
        url += `&${queryParams.join("&")}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users);
      setIsUsersLoading(false);
    }
    fetchUsers();
  }, [selectedLanguages, selectedSoftSkills]);

  if (isUsersLoading) {
    return null;
  }

  return (
    <div className="usergrid-container">
      {users.length === 0 ? (
        <div className="no-users-alert">
          🚫 По выбранным фильтрам студентов не найдено
        </div>
      ) : (
        users.map((user) => <UserCard key={user["Логин"]} user={user} />)
      )}
    </div>
  );
}

function UserCard({ user }) {
  const skillPercent = parseInt(user.proficiency);
  const languages = user.langs.split(" ");
  const softSkills = user.soft_skills ? user.soft_skills.split(", ") : [];

  return (
    <div className="usercard-wrapper">
      <div className="usercard-image-container">
        <img src={avatar1} alt="avatar" className="usercard-image" />
      </div>
      <div className="usercard-info-container">
        <div className="usercard-header">
          <span className="usercard-fullname">{user["ФИО"]}</span>
          <span className="usercard-phone">+{user["Телефон"]}</span>
          <a href="#" className="usercard-login">
            @{user["Логин"]}
          </a>
        </div>

        <div className="usercard-langs">
          <h3 className="usercard-section-title">
            Знания языков программирования
          </h3>
          <div className="usercard-langs-list">
            {languages.map((lang, idx) => (
              <div key={idx} className="usercard-lang-item">
                {lang.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div className="usercard-langs">
          <h3 className="usercard-section-title">Soft Skills</h3>
          <div className="usercard-langs-list">
            {softSkills.map((skill, idx) => (
              <div key={idx} className="usercard-skills-item">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="usercard-skills">
          <h3 className="usercard-section-title">Общее количество навыков</h3>
          <div className="usercard-progress-bar">
            <div
              className="usercard-progress usercard-progress-animate"
              style={{ width: `${skillPercent}%` }}
            >
              <span className="usercard-progress-text">{user.proficiency}</span>
            </div>
          </div>
        </div>

        <button className="usercard-button">Перейти к студенту</button>
      </div>
    </div>
  );
}
