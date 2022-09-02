import { Text, Navbar, Button, Link, Avatar, Dropdown, Loading, NavbarToggleProps } from '@nextui-org/react';
import NextLink from 'next/link';

import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Key, useState } from 'react';
import { UserSquare, FilmStrip, Gear } from 'phosphor-react';

function handleDropdownAction(action: Key) {
  if (action === 'signOut') {
    signOut();
    return;
  }
  console.log(action);
}

export const Navigation = ({}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  const { pathname } = router;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Workaround for closing navbar on mobile when clicking on a link
  if (router.events) {
    router.events.on('routeChangeComplete', () => {
      setIsNavbarOpen(false);
    });
  }
  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  // Placeholder values
  const collapseItems = [
    { title: 'Home', path: '/' },
    { title: 'Features', path: '/features' },
    { title: 'Customers', path: '#' },
    { title: 'Pricing', path: '#' },
    { title: 'Company', path: '#' },
  ];

  // Placeholder values
  const navLinks = [
    { title: 'Features', path: '/features' },
    { title: 'Customers', path: '#' },
    { title: 'Pricing', path: '#' },
    { title: 'Company', path: '#' },
  ];

  return (
    <Navbar variant="floating">
      <Navbar.Toggle
        isSelected={isNavbarOpen}
        onChange={(e) => setIsNavbarOpen(e as boolean)}
        aria-label="toggle navigation"
        showIn={'xs'}
      />
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          <NextLink href="/">Gearlist</NextLink>
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs">
        {navLinks.map((link, index) => (
          <NextLink href={link.path} key={index}>
            <Navbar.Link key={index} isActive={isActiveRoute(link.path)}>
              {link.title}
            </Navbar.Link>
          </NextLink>
        ))}
      </Navbar.Content>

      {!session && (
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat disabled={isLoading} as={Link} onClick={() => signIn()}>
              {isLoading ? <Loading color="currentColor" size="sm" /> : 'Sign In'}
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      )}
      {session && (
        <>
          <Navbar.Content
            css={{
              '@xs': {
                w: '12%',
                jc: 'flex-end',
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={session.user?.image || 'https://i.pravatar.cc/150'}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => handleDropdownAction(actionKey)}
              >
                <Dropdown.Item
                  icon={<UserSquare weight="light" size={24} />}
                  key="profile"
                  // css={{ height: '$18' }}
                >
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    @{session.user.name || '...'}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="collections" withDivider icon={<FilmStrip size={24} weight="light" />}>
                  My Collections
                </Dropdown.Item>
                {/* <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item> */}
                <Dropdown.Item key="settings" withDivider icon={<Gear size={24} weight="light" />}>
                  Settings
                </Dropdown.Item>

                <Dropdown.Item key="signOut" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        </>
      )}
      <Navbar.Collapse isOpen={isNavbarOpen}>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={index}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? '$error' : '',
            }}
            isActive={isActiveRoute(item.path)}
          >
            <NextLink href={item.path}>
              <Link
                color="inherit"
                css={{
                  minWidth: '100%',
                }}
              >
                {item.title}
              </Link>
            </NextLink>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
