const StockMovementsPage = () => {

  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        px-7
        py-7
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >
      <div className="w-full min-w-0">

        <div className="mb-6">
          <h1
            className="
              text-[22px]
              font-semibold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            Stock Movements
          </h1>

          <p
            className="
              mt-1
              text-[13px]
              leading-5
              text-slate-500
              dark:text-slate-400
            "
          >
            Track all stock movements in real-time.
          </p>
        </div>

      </div>
    </div>
  );
};

export default StockMovementsPage;