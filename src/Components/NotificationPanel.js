import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const NotificationPanel = ({ 
  isOpen, 
  onClose, 
  notifications,
  onMarkAsTaken,
  title = "Notifications",
  emptyMessage = "You're all caught up!",
  emptyDescription = "No pending notifications"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-xs sm:max-w-md h-full overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="text-gray-500 text-sm sm:text-base" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {notifications.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className="p-3 sm:p-4 rounded-lg border"
                      style={{
                        borderColor: notification.status === "Pending" ? "#f59e0b20" : "#ef444420",
                        backgroundColor: notification.status === "Pending" ? "#fef9c320" : "#fee2e220"
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className="p-1.5 sm:p-2 rounded-full"
                          style={{
                            backgroundColor: notification.status === "Pending" ? "#fef3c7" : "#fee2e2",
                            color: notification.status === "Pending" ? "#d97706" : "#dc2626"
                          }}
                        >
                          {notification.status === "Pending" ? (
                            <FaClock className="text-sm sm:text-lg" />
                          ) : (
                            <FaExclamationCircle className="text-sm sm:text-lg" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                            {notification.medicine || notification.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {notification.dosage && `${notification.dosage} • `}
                            {notification.schedule || notification.description}
                          </p>
                          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                            <FaClock className="mr-1 sm:mr-2" />
                            {notification.time}
                          </div>
                          {notification.status === "Pending" && onMarkAsTaken && (
                            <button
                              onClick={() => onMarkAsTaken(notification.id)}
                              className="mt-2 sm:mt-3 text-xs sm:text-sm bg-green-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1"
                            >
                              <FaCheckCircle className="text-xs sm:text-sm" />
                              Mark as Taken
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FaCheckCircle className="mx-auto text-green-500 text-3xl sm:text-4xl mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">{emptyMessage}</h3>
                  <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">{emptyDescription}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;