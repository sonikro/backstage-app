import { Content, Header, Page } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { scmAuthApiRef } from '@backstage/integration-react';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { SearchContextProvider } from '@backstage/plugin-search-react';
import { Grid } from '@material-ui/core';
import React from 'react';
import useAsync from 'react-use/lib/useAsync';

export const HomePage = () => {
  const scmAuthAPi = useApi(scmAuthApiRef);


  const { value, loading } = useAsync(() => {
      return scmAuthAPi.getCredentials({
        url: "https://github.com",
      })
  }, [scmAuthAPi]);

  return (
    <SearchContextProvider>
        {loading && <div>Loading...</div>}
        {value && <div>A GitHub Token was generated with default scopes</div>}
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={6}>
            <Grid container>
              <Grid item xs={12}>
                <Header
                  title="Backstage"
                  subtitle="Internal Developer Portal"
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center" direction="row">
              <HomePageSearchBar
                data-tour="homepage-search-bar"
                placeholder="Search"
                debounceTime={0}
              />
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};
