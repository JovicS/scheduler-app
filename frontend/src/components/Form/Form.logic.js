import { useState } from 'react';
// ----------------------------------------------------------------------

export default function InitFormLogic() {
  
    const [_, setIsChanged] = useState(false);
  
    return {
        setIsChanged
    }
  }