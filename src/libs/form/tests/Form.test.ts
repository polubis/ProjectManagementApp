import Form, { FormBuilder } from '..';

describe('Form', () => {
  it('Creates form', () => {
    class User {
      constructor(public id: number, public name: string) {}
    }
    class UserBuilder implements FormBuilder<User> {
      user: User;

      create = () => {
        this.user = new User(0, 'Pablo');
      };

      get = () => this.user;
    }
    const form = new Form();
    const userBuilder = new UserBuilder();

    const user = form.construct(userBuilder);

    expect(user).toEqual(new User(0, 'Pablo'));
  });
});
