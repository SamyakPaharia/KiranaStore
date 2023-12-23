import AdminHeader from "./AdminHeader";
import DeliveryPersonHeader from "./DeliveryPersonHeader";
import HeaderUser from "./HeaderUser";
import ManagerHeader from "./ManagerHeader";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));

  if (user != null) {
    return <HeaderUser />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (deliveryPerson != null) {
    return <DeliveryPersonHeader />;
  } else if (manager != null) {
    return <ManagerHeader />;
  }
  else {
    return <NormalHeader />;
  }
};

export default RoleNav;
