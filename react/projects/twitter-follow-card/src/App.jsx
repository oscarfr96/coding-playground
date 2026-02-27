import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'oscarfr96',
    name: 'Óscar Fraile',
    isFollowing: true
  },
  {
    userName: 'batman',
    name: 'Batman',
    isFollowing: false
  },
  {
    userName: 'ligiaboga',
    name: 'Ligia Boga',
    isFollowing: true
  },
  {
    userName: 'superman',
    name: 'Clark Kent',
    isFollowing: false
  }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}