import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './components/App';
import Home from './components/Home/home';
import Form from './components/Form/urlShortenerForm'
import Table from './components/Tables/shortlinkTable'


describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const app = render(<App />);
    expect(app).not.toBeNull();
  });
});


describe("<Home />", () => {
  it("Finding element title", () => {
    const home = render(<Home />);
    expect(home).not.toBeNull();

    const title = home.getByText(/Welcome to my Url shortener service/i)
    expect(title).toBeInTheDocument();
  });
});

describe("<Table />", () => {
  it("Table elements check", () => {
    const urls = [{
      id : 0,
      url : 'https://www.google.com',
      shortLink : 'google'
    }]

    const table = render(<Table urls={[]}/>);
    expect(table).not.toBeNull();

    const tableFieldDefault = table.getByText(/list empty/i);
    expect(tableFieldDefault).toBeInTheDocument();
    expect(tableFieldDefault.innerHTML).toEqual('List empty')

    // passing fake urls as props
    const tableTwo = render(<Table urls={urls} />)
    const item = tableTwo.getByLabelText('item1');

    expect(item.innerHTML).toEqual(urls[0].shortLink)

    const buttonDelete = tableTwo.getByLabelText('btnDelete1');
    expect(buttonDelete).toBeInTheDocument();

    userEvent.click(buttonDelete);
  });
});

describe("<Form />", () => {
  it("Checking input changing", () => {
    const formUrls = render(<Form />);
    expect(formUrls).not.toBeNull();

    // checking input change with fireEvent
    const inputShortlink = formUrls.getByLabelText('shortLinkInput');
    expect(inputShortlink).toBeInTheDocument();
    expect(inputShortlink.value).toBe('')

    fireEvent.change(inputShortlink, {
      target : {
        value : 'google'
      }
    });

    const newValue = formUrls.getByLabelText('shortLinkInput').value
    expect(newValue).toEqual('google')

    // checking input change with userEvent with promise
    formUrls.findByTestId('urlInput')
    .then(elem => {
      expect(elem.value).toBe('')

      userEvent.type(elem, 'hello')
      .then(() => expect(elem.value).toBe('hello'))
      .catch(err => console.log('err ->',err));
    })
    .catch(err => console.log('err ->',err))
  });
});












