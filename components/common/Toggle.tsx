import { memo } from 'react';
import ChatIcon from '@mui/icons-material/Chat';

const Toggle = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <div className="p-4 will-change-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-3xl w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 shadow-lg"
        onClick={onClick}
      >
        <ChatIcon sx={{ mr: 1 }} />
        Chat
      </button>
    </div>
  );
};

export default memo(Toggle);
