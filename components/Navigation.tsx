import {
  Text,
  Navbar,
  Button,
  Link,
  Avatar,
  Dropdown,
  Loading,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Key } from 'react';

function handleDropdownAction(action: Key) {
  if (action === 'signOut') {
    signOut();
    return;
  }
  console.log(action);
}

export const Navigation = ({}) => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const router = useRouter();
  const { pathname } = router;

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  const collapseItems = [
    'Features',
    'Customers',
    'Pricing',
    'Company',
    'My Collections',
    'Settings',
    'Log Out',
  ];

  return (
    <Navbar variant="floating">
      <Navbar.Toggle aria-label="toggle navigation" showIn={'xs'} />
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Gearlist
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs">
        <Navbar.Link isActive={isActiveRoute('/features')} href="#">
          Features
        </Navbar.Link>
        <Navbar.Link isActive={isActiveRoute('/customers')} href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link isActive={isActiveRoute('/pricing')} href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link isActive={isActiveRoute('/company')} href="#">
          Company
        </Navbar.Link>
      </Navbar.Content>

      {!session && (
        <Navbar.Content>
          {/* <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link> */}
          <Navbar.Item>
            <Button
              auto
              flat
              disabled={isLoading}
              as={Link}
              onClick={() => signIn()}
            >
              {isLoading ? (
                <Loading color="currentColor" size="sm" />
              ) : (
                'Sign In'
              )}
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
                    src={
                      session.user?.image ||
                      'https://i.pravatar.cc/150?u=a042581f4e29026704d'
                    }
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => handleDropdownAction(actionKey)}
              >
                <Dropdown.Item key="profile" css={{ height: '$18' }}>
                  {/* <Text b color="inherit" css={{ d: 'flex' }}>
                    Profile
                  </Text> */}
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    {/* {session.user?.email || '...'} */}@
                    {session.user.name || '...'}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="collections" withDivider>
                  My Collections
                </Dropdown.Item>
                {/* <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item> */}
                <Dropdown.Item key="settings" withDivider>
                  Settings
                </Dropdown.Item>
                {/* <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item> */}
                <Dropdown.Item key="signOut" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem
                key={item}
                activeColor="secondary"
                css={{
                  color: index === collapseItems.length - 1 ? '$error' : '',
                }}
                isActive={index === 2}
              >
                <Link
                  color="inherit"
                  css={{
                    minWidth: '100%',
                  }}
                  href="#"
                >
                  {item}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};
