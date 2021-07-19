import FavoritesList from '../FavoritesList';
import mockAxios from 'jest-mock-axios';

describe('Profile component', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
  });

  it('does somthing', () => {
    expect(mockAxios.post).toHaveBeenCalled();

    let responseObj = {
      data: [
        { id: '123', name: 'playlist1' },
        { id: '456', name: 'playlist2' },
      ],
    };
    mockAxios.mockResponse(responseObj);

    expect(FavoritesList.length).toEqual(2);
  });
});
