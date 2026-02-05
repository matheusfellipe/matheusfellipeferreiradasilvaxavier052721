import { AppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import HeaderNav from "./HeaderNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {

    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        >
        <AppShell.Header>
           <HeaderNav opened={opened} toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
            {/* <UnstyledButton className={classes.control}>Home</UnstyledButton>
            <UnstyledButton className={classes.control}>Blog</UnstyledButton>
            <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
            <UnstyledButton className={classes.control}>Support</UnstyledButton> */}
        </AppShell.Navbar>

        <AppShell.Main>
           <Outlet/> 
        </AppShell.Main>
        </AppShell>
    )
}

export default AppLayout


