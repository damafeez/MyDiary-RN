
import {Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  background: '#F5F5F6',
  primary: '#3C4858',
  secondary: '#686B6F',
  tertiary: '#C4C4C4',
  headerText: '#414A53'
}

export const padding = {
  sm: 10,
  md: 25,
  lg: 35,
  xl: 60
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
}

export const reusable = {
  button: {
    width: 300,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: colors.primary,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#50555ac2',
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 3,
    marginVertical: 10
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.headerText,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'flex-start'
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: padding.md,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
}
