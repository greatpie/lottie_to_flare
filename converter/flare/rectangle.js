import nodeId from '../helpers/nodeId'

const rectangle = (width = 1, height = 1, cornerRadius = 0) => {
	return {
		type: "rectangle",
		id: nodeId(),
		name: "Rectangle Path",
		translation: [width / 2, height / 2],
		width,
		height,
		cornerRadius,
	}
}

export default rectangle

