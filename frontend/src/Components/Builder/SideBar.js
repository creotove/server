import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const SideBar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useLoggedIn();
  const location = useLocation();
  const [publisherId, setPublisherId] = useState(location?.state?.id);
  useEffect(() => {
    setPublisherId(location?.pathname.split("/")[2]);
  }, []);
  return (
    <div className="bg-black vh-100 text-nowrap">
      <h4 className="text-white px-3 py-2">
        <section>
          <p>hello world</p>
        </section>
      </h4>
    </div>
  );
};

export default SideBar;
