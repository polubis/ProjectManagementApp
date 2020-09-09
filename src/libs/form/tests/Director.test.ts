import { Director, IBuilder } from '..';

describe('Director', () => {
  it('Creates object', () => {
    class User {
      constructor(public id: number, public name: string) {}
    }
    class UserBuilder implements IBuilder<User> {
      user: User;

      create = () => {
        this.user = new User(0, 'Pablo');
      };

      get = () => this.user;
    }
    const director = new Director();
    const userBuilder = new UserBuilder();

    const user = director.construct(userBuilder);

    expect(user).toEqual(new User(0, 'Pablo'));
  });
});
