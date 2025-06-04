import { Button } from '@/components/ui/button';
import { memo } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { NavLink } from 'react-router-dom';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, string> = {
    a: 'Left Window',
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
};

const MosaicApp = memo(() => {
    return (
        <div>
            <div className="flex justify-end p-1">
                <NavLink to="/">
                    <Button className="btn">Go to Home</Button>
                </NavLink>
            </div>
            <div id="app" className="h-screen">
                <Mosaic<ViewId>
                    className="mosaic-blueprint-theme"
                    renderTile={(id, path) => (
                        <MosaicWindow<ViewId>  path={path} createNode={() => 'new'} title={TITLE_MAP[id]}>
                            <div style={{ color: 'black' }}>
                                <h1>{TITLE_MAP[id]}</h1>
                            </div>
                        </MosaicWindow>
                    )}
                    initialValue={{
                        direction: 'row',
                        first: 'a',
                        second: {
                            direction: 'column',
                            first: 'b',
                            second: 'c',
                        },
                    }}
                />
            </div>
        </div>
    )
});

export default MosaicApp;