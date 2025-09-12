import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Selamat </p>

      <div className="flex mt-4 gap-7">
      <div className="card card-border bg-base-100 w-65 h-30">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card </p>
        </div>
      </div>
      <div className="card card-border bg-base-100 w-65 h-30">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card </p>
        </div>
      </div>
      <div className="card card-border bg-base-100 w-65 h-30">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card </p>
        </div>
      </div>
      <div className="card card-border bg-base-100 w-65 h-30">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card </p>
        </div>
      </div>
      </div>



      <div className="flex mt-20 gap-8">
         <div className="card card-border bg-base-100 w-200 h-100">
            <div className="card-body">
            </div>
         </div>
         <div className="card card-border bg-base-100 w-73 h-100">
            <div className="card-body">
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;