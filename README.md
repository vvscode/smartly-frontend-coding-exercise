# Smartly.io Frontend Coding Exercise

Your goal in this exercise is to implement autocomplete functionality to a React input component.

## Running the starter code

You can start the provided Webpack development server by running:

```
docker-compose up app
```

The development server is then accessible via http://localhost:8050.

## Requirements

The component will be implemented into the `autocomplete-input.tsx` file. The file must have a single default export, i.e. the React component. The component receives only a single prop called `onRowSelect(value: string)`.

You can expect the 'lodash' and 'classnames' libraries to be available in the development environment. No additional library imports should be used.

In its initial state the autocomplete input should display a placeholder text `Search...`. After the user types into the input we want to fetch autocomplete results matching the user value and display the available autocomplete results.

The autocomplete results can be fetched by performing a GET request to an endpoint:

```
GET /search?q=foo
```

You can use a relative URL, expecting that the server is running in the same domain. The endpoint accepts a single query parameter (`q`) which defines the autocomplete input query value. The result of the request is always an array of autocomplete strings. You can assume that the number of autocomplete results is always below 100 and that the endpoint always returns a successful response (HTTP 200).

When performing a request you should indicate a loading state in the input element. This can be done by applying the class name `is-loading` to the input control element (i.e. `autocomplete-control`).

To prevent unnecessary network traffic you are also expected to debounce the autocomplete queries using a 500ms threshold. This means that there should be a maximum of 1 request made within 500ms regardless of how many times the HTML input value changes.

After fetching the results you are expected to render them in a list below the input element, i.e. within the `autocomplete-list` element. Each result item should be rendered as a HTML `div` element with the class name `autocomplete-item` and the `option` ARIA role. In case there are no results available, the result list element should not be rendered.

Clicking any of the results should set the input value to the selected row's value. Additionally, clicking the row should also call the `onRowSelect(value: string)` function provided as a prop to the component with the selected value. Selecting a value should additionally hide the results list and focus the input.

## Testing

You can test the implemented solution by running:

```
docker-compose up test
```

The test container will run in watch mode, re-running the test set automatically set the code is updated. A fully valid solution should pass all the test cases.
