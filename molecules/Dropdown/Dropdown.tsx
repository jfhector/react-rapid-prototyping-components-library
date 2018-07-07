import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './Dropdown.css'

import {} from '../../../sharedTypes'
import {} from '../../../data'
import { images } from '../../../assets'
import {} from '../..'

interface Props {
    minWidth?: number

    // Instance-specific data extracted from appState upstream
    value: string
    optionsObject: {[k: string]: number | undefined}
    
    // Instance-specific function extracted from actions upstream
    handleOptionSelection: (newSelection: string) => void
}

interface State {
    optionsContainerVisible: boolean
}

export class Dropdown extends React.Component<Props, State> {    
    static defaultProps = {
        minWidth: 230,
    }
    
    state = {
        optionsContainerVisible: false,
    }

    actions = {
        toggleOptionsContainerVisible: () => {
            this.setState(
                (prevState: State) => ({
                    optionsContainerVisible: !prevState.optionsContainerVisible
                })
            )
        }
    }

    render() {
        const { props } = this

        return (
            <div
                className={classNames(
                    styles.Dropdown,
                    {
                        [styles.optionsContainerVisible]: this.state.optionsContainerVisible,
                    }
                )}
                onClick={this.actions.toggleOptionsContainerVisible}
            >
                <div
                    className={styles.title}
                >
                    {props.value}
                </div>
                
                <img 
                    src={require('../../../assets/PROTOSVG_UI_LIB_DropdownCaret.svg')}
                />

                <div
                    className={styles.optionsContainer}
                    style={{minWidth: props.minWidth}}
                >
                    {
                        Object.keys(props.optionsObject).map(
                            (optionName: string) => (
                                <div
                                    className={classNames(
                                        styles.selectableOptionName,
                                        {
                                            [styles.nested1LevelOptionName]: props.optionsObject[optionName] === 1,
                                            [styles.nested2LevelsOptionName]: props.optionsObject[optionName] === 2,
                                        }
                                    )}
                                    key={`${optionName}`}
                                    onClick={() => {
                                        props.handleOptionSelection(optionName)
                                    }}
                                >
                                    {optionName}
                                </div>
                            )
                        )
                    }

                    <div
                        className={styles.selectorPointyTop}
                    />
                </div>

                {this.state.optionsContainerVisible &&
                    <div
                        className={styles.backdropToCatchClicksAwayFromSelector}
                    />
                }
            </div>
        )
    }
}
