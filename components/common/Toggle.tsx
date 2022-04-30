import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';

const Toggle = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <div className="p-4">
      <Fab variant="extended" onClick={onClick}>
        <ChatIcon sx={{ mr: 1 }} />
        Chat
      </Fab>
    </div>
  );
};

export default Toggle;
