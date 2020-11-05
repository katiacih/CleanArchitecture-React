import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/pages/components/spinner/spinner'
import Header from '@/presentation/pages/components/login-header/login-header'
import Footer from '@/presentation/pages/components/footer/footer'
import Input from '@/presentation/pages/components/input/input'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input  type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login