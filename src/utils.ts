export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement | OffscreenCanvas): Boolean {
    // Return false for OffscreenCanvas always
    if (!("clientWidth" in canvas) || !("clientHeight" in canvas)) {
        return false;
    }
    const htmlCanvas = canvas as HTMLCanvasElement;
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = htmlCanvas.clientWidth || 100;
    const displayHeight = htmlCanvas.clientHeight || 100;

    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}