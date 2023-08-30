import { useState } from 'react'

function InitDatePickerLogic() {
    const [open, setOpen] = useState(false);
  return {
    open, setOpen
  }
}

export default InitDatePickerLogic