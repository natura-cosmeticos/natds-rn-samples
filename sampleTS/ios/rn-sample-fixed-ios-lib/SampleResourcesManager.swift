import UIKit

typealias File = (name: String, extension: String)

public final class SampleResourcesManager {

    private static let fontFiles: [File] = [
        (name: "natds-icons", extension: "svg"),
        (name: "natds-icons", extension: "ttf"),
        (name: "natds-icons", extension: "woff"),
        (name: "natds-icons", extension: "woff2"),
        (name: "natds-icons", extension: "eot")
    ]

    public static func registerFonts() {
        for file in fontFiles {
            let frameworkBundle = Bundle(for: SampleResourcesManager.self)
            let pathForResourceString = frameworkBundle.path(forResource: file.name, ofType: file.extension, inDirectory: "assets/fonts")

            guard let fontData = NSData(contentsOfFile: pathForResourceString ?? "") else {
                print("Failed to register font - \(file.name) not found.")
                return
            }
            guard let dataProvider = CGDataProvider(data: fontData) else {
                print("Failed to register font - \(file.name) not found.")
                return
            }

            let fontRef = CGFont(dataProvider)
            var errorRef: Unmanaged<CFError>? = nil

            if fontRef != nil {
                if (CTFontManagerRegisterGraphicsFont(fontRef!, &errorRef) == false) {
                    print("Failed to register font - register graphics font failed - this font may have already been registered in the main bundle.")
                }
            }
        }
    }
}
