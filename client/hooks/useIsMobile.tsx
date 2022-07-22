import {useMediaQuery} from "@mui/material";
import { useTheme } from '@material-ui/core/styles';

export function useIsMobile() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return { isMobile }
}
