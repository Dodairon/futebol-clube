import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let response: Response;

describe('/login', () => {
  it('retornar Token', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
      });
    expect(response.body).to.have.property('token');
    expect(response.body.user).to.have.property('id');
    expect(response.body.user).to.have.property('role');
    expect(response.body.user).to.have.property('email');
    expect(response.body.user).to.have.property('username');
    expect(response.body.user).to.not.have.property('password');
    expect(response.status).to.equal(200);
  });

  it('email invalido', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'batata@frita.com',
        password: 'secret_user',
      });
    expect(response.body.message).to.equal('Incorrect email or password');
    expect(response.status).to.equal(401);
  });

  it('senha invalida', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'ElaSempreVemMuchaQuandoPecoNoIfood',
      });
    expect(response.body.message).to.equal('Incorrect email or password');
    expect(response.status).to.equal(401);
  });

  it('Sem email', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        password: 'ElaSempreVemMuchaQuandoPecoNoIfood',
      });
    expect(response.body.message).to.equal('All fields must be filled');
    expect(response.status).to.equal(400);
  });

  it('Sem senha', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'batata@frita.com',
      });
    expect(response.body.message).to.equal('All fields must be filled');
    expect(response.status).to.equal(400);
  });
});

describe('/login/validate', () => {
  it('retornar usuario', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
      });
      response = await chai.request(app)
      .get('/login/validate')
      .set({'authorization': response.body.token});
    expect(response.status).to.equal(200);
  });
  it('autorizacao nao encontrada', async () => {
    response = await chai.request(app)
      .get('/login/validate')
    expect(response.status).to.equal(400);
  });
});
