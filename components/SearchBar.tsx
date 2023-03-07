import { Input, Loading, Container, Link } from '@nextui-org/react';
import { MagnifyingGlass } from 'phosphor-react';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const router = useRouter();

  const search = async (query: string) => {
    console.log(query);
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const res = await fetch('/api/items/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    console.log(data);

    if (data.items && data.items.length > 0) {
      setResults(data.items);
      setIsResultsOpen(true);
    } else {
      setResults([]);
      setIsResultsOpen(false);
    }

    setIsLoading(false);
  };

  const debouncedSearch = debounce(search, 500);

  const createSlug = (item: any) => {
    return (
      `${item.brand}-${item.model}`
        .replace(/\s+/g, '-')
        // replace / with empty string
        .replace(/\//g, '')
        .toLowerCase()
    );
  };

  const handleLinkClick = (item: any) => {
    return () => {
      router.push(`/items/${createSlug(item)}/${item.id}`);
    };
  };

  return (
    <>
      <Input
        clearable
        contentLeft={<MagnifyingGlass size={16} />}
        contentLeftStyling={false}
        size="md"
        // bordered
        css={{
          w: '100%',
          '@xsMax': {
            mw: '100px',
          },
          '& .nextui-input-content--left': {
            h: '100%',
            ml: '$4',
            dflex: 'center',
          },
        }}
        placeholder="Search..."
        aria-label="Search"
        contentRight={isLoading && <Loading size="xs" color="secondary" />}
        onChange={(e) => {
          debouncedSearch(e.target.value);
        }}
        onClearClick={() => {
          setResults([]);
        }}
      />
      {results.length > 0 && isResultsOpen && (
        <Container
          css={{
            position: 'absolute',
            top: '100%',
            pt: '$4',
            pb: '$6',
            left: 0,
            right: 0,
            bg: '$background',
            boxShadow: '$sm',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {results.map((result) => (
            <Container
              key={result.id}
              css={{
                p: '$6',
                // if not last item add border bottom
                '&:first-child': {
                  boxSizing: 'border-box',
                },
                '&:not(:last-child)': {
                  borderBottom: '1px solid $border',
                },
              }}
            >
              <Link onClick={handleLinkClick(result)}>
                {result.brand} {result.model}
              </Link>
            </Container>
          ))}
        </Container>
      )}
    </>
  );
}
