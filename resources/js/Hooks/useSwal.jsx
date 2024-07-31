import clsx from "clsx";
import Swal from "sweetalert2";

const customClass = {
    popup: 'bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg',
    title: 'tracking-tight text-slate-800 dark:text-white text-xl font-bold mb-2',
    htmlContainer: 'tracking-tight text-gray-600 dark:text-gray-200 mb-4',
    actions: 'space-x-2',
    confirmButton: 'rounded-lg px-3 py-2 tracking-tight font-medium transition-colors focus:outline-none flex items-center justify-center gap-1 capitalize border-2 border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20',
    cancelButton: 'rounded-lg px-3 py-2 tracking-tight font-medium transition-colors focus:outline-none flex items-center justify-center gap-1 capitalize border-2 border-red-400 bg-red-400/10 text-red-400 hover:bg-red-400/20',
};

const useSweetAlert = () => {

  const showAlert = (options) => {
    const result = Swal.fire({
      customClass: customClass,
      buttonsStyling: false,
      ...options,
    });

    return result;
  };

  return { showAlert };
};

export default useSweetAlert;
