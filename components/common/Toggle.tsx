import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';

const Toggle = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <Fab variant="extended" onClick={onClick} className="m-4">
      <ChatIcon sx={{ mr: 1 }} />
      Chat
    </Fab>
  );
};

export default Toggle;
