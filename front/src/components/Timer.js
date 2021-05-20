import { useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'

function Timer() {
  const time = useSelector(s => s.time)

  return (
    <Box
      p={2}
      position="absolute"
      top={0}
      right={0}
    >
      {time}
    </Box>
  )
}

export default Timer
