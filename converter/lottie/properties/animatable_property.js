import deserialize from "../deserialize.js";
import Keyframe from "./keyframe.js";

export default class AnimatableProperty
{
    constructor()
    {
        this._IsAnimated = false;
        this._Value = null;
        this._KeyFrames = null;
    }

    static deserializeType(value, type, cb)
    {
        if (!(value instanceof Object))
        {
            return cb(null);
        }

        const animatableProperty = new AnimatableProperty();
        if (animatableProperty.deserialize(value, type))
        {
            return cb(animatableProperty);
        }

        return cb(null);
    }

    deserialize(value, type)
    {
        const isAnimated = value['a'] ? true : false;
        this._IsAnimated = isAnimated;

        const k = value['k'];

        if (isAnimated && k instanceof Array)
        {
            // Animated flag was up and the key property is a list
            const keyFrames = [];
            let lastKeyFrameJson = null;
            for (const keyFrameJson of k)
            {
                if (!(keyFrameJson instanceof Object))
                {
                    continue;
                }
                Keyframe.deserializeType(lastKeyFrameJson, keyFrameJson, type, (keyframe) =>
                {
                    if (keyframe)
                    {
                        keyFrames.push(keyframe);
                    }
                });
            }

            this._KeyFrames = keyFrames;
            console.log('KEY', keyFrames);

            return true;
        }
        else if (!isAnimated)
        {
            // Animated flag was down and the key property is an object
            const value = new type();
            if (value.deserialize(k))
            {
                this._Value = value;
            }
            return true;
        }

        return false;
    }
}