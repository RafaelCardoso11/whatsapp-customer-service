import '@testing-library/jest-dom'
import { execSync } from 'child_process'

jest.useFakeTimers().setSystemTime(new Date('2023-01-01:00:00'))

// Executa o comando "tsc" para compilar o código TypeScript antes de executar os testes
execSync('tsc')
