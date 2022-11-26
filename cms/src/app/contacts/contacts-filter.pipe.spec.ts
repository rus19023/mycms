import { ContactsFilterPipe } from './contacts-filter.pipe';

describe('ContactsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
