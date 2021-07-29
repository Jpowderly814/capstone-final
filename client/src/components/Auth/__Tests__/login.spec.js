// import React from 'react';
// import { wrapper, render, screen } from '@testing-library/react';

// import { shallow, configure } from 'enzyme';

// import Login from '../Login';

// // import Adapter from 'enzyme-adapter-react-16';
// import axios from 'axios';

// // configure({ adapter: new Adapter() });

// jest.mock('axios', () => {
//   return {
//     post: jest.fn()
//   };
// });

// describe('Login component', () => {
//   describe('login tests', () => {

//     const username = 'username123';
//     const password = 'password123';

//     beforeEach(() => {
//       //Test error response tests
//       axios.post.mockResolvedValue({});
//     });

//     it('should call endpoint with given username & password', () => {
//       // let wrapper = shallow(<Login />);
//       //  wrapper.instance().login = jest.fn();
//       //  wrapper.update();

//       expect(axios.post).toBeCalledWith('http://localhost:3001/login', {
//         username,
//         password,
//       });
//     });
//   });
// });

// describe('Login', () => {
//   it('should call axios with username and password', async () => {
//     const username = 'username123';
//     const password = 'password123';

//     window.axios = jest.fn();
//     window.axios.mockResolvedValueOnce({});
//     render(<Login />);

//   });
// });
