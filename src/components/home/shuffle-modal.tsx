import { Dispatch, Fragment, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import ShuffleModalFields from "./shuffle-modal-fields";
import { SafeUser } from "../../modal/user.modal";

interface ShuffleModalProps {
  showShuffle: boolean;
  setShowShuffle: Dispatch<SetStateAction<boolean>>;
  availableUsers: SafeUser[];
}

const ShuffleModal: React.FC<ShuffleModalProps> = ({
  showShuffle,
  setShowShuffle,
  availableUsers,
}: ShuffleModalProps) => {
  return (
    <Transition.Root show={showShuffle} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        onClose={() => setShowShuffle(false)}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gray-800 rounded-lg w-[90%] px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <ShuffleModalFields availableUsers={availableUsers} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShuffleModal;
