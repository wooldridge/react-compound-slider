// @flow weak

import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-electric-slide'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Handle, Track, Tick } from './components' // example render components - source below

const domain = [100, 500]
const defaultValues = [450, 400, 300, 150]

class Example extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const { state: { values, update } } = this

    return (
      <div style={{ height: 120, width: '100%' }}>
        <ValueViewer values={values} update={update} />
        <Slider
          rootStyle={{
            position: 'relative',
            width: '100%',
          }}
          mode={2}
          step={5}
          domain={domain}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail>
            {({ emitMouse, emitTouch }) => (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgb(155,155,155)',
                }}
                onMouseDown={e => emitMouse(e)}
                onTouchStart={e => emitTouch(e)}
              />
            )}
          </Rail>
          <Handles>
            {({ handles, emitMouse, emitTouch }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks>
            {({ tracks, emitMouse, emitTouch }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={15}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example
