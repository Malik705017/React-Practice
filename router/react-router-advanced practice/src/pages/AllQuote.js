import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NoQoutesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const AllQuote = () => {
  const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);
  console.log('AllQuote RUNNING', status);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQoutesFound />;
  }

  return <QuoteList quotes={loadedQuotes}>All quotes</QuoteList>;
};

export default AllQuote;
