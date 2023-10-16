import { useAuth } from "@/components/context/auth-context";

const AdminDashboard = () => {
  const { authState } = useAuth();
  console.log(authState, "this is auth");
  return (
    <div>
      I am admin dashboard
      <h1>hi</h1>
    </div>
  );
};

export default AdminDashboard;