import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './CorinnaDropDownSelector.css'

import {} from '../../../sharedTypes'
import {} from '../../../data'
import { images } from '../../../assets'
import {} from '../..'

interface Props {
    bold?: boolean
    minWidth?: number

    // Instance-specific data extracted from appState upstream
    value: string
    optionsObject: {[k: string]: number | undefined}
    
    // Instance-specific function extracted from actions upstream
    handleOptionSelection: (newSelection: string) => void
}

interface State {
    optionsVisible: boolean
}

export class CorinnaDropDownSelector extends React.Component<Props, State> {    
    static defaultProps = {
        bold: false,
        minWidth: 300,
    }
    
    state = {
        optionsVisible: false,
    }

    actions = {
        toggleVisible: {
            options: () => {
                this.setState(
                    (prevState: State) => ({
                        optionsVisible: !prevState.optionsVisible,
                    })
                )
            }
        }
    }

    render() {
        const { props } = this

        return (
            <div
                className={classNames(
                    styles.CorinnaDropDownSelector,
                    {
                        [styles.optionsVisible]: this.state.optionsVisible,
                        [styles.bold]: props.bold,
                    }
                )}
            >
                <div
                    className={styles.title}
                    onClick={this.actions.toggleVisible.options}
                >
                    {props.value}
                </div>
                
                <div
                    className={styles.caret}
                    onClick={this.actions.toggleVisible.options}
                >
                    <img 
                        src={
                            (function() {
                                switch (props.bold) {
                                    case true:
                                        return images.interface.caret35pt
                                    case false:
                                        return images.interface.caret25pt
                                    default:
                                        throw new Error('props.bold did not match any switch case')
                                        // let _exhaustiveCheck: never = props.bold
                                        // return _exhaustiveCheck
                                }                         
                            })()
                        }
                    />
                </div>

                <div
                    className={styles.optionSelectorContainer}
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
                                        this.actions.toggleVisible.options()
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

                {this.state.optionsVisible &&
                    <div
                        className={styles.backdropToCatchClicksAwayFromSelector}
                        onClick={this.actions.toggleVisible.options}
                    />
                }
            </div>
        )
    }
}
