import Foundation
import UIKit
import class React.RCTBridge

@objc public class DesignSystemModule: NSObject {
    public static var currentViewController: UIViewController?
    public static var delegate: NotebookModuleDelegate?

    @objc public static func getViewController() -> UIViewController? {
        return currentViewController
    }

    // MARK: - Initialization

  public func start(fromViewController viewController: UIViewController, parameters: NotebookParameters,
                    delegate: NotebookModuleDelegate) {
        guard let bridge = RCTBridge(delegate: self, launchOptions: nil) else {
            return
        }

        let reactView = self.buildReactView(bridge: bridge, parameters: parameters)
        viewController.view.addSubview(reactView)
        self.setupConstraints(reactView, for: viewController)

        NotebookModule.currentViewController = viewController
        NotebookModule.delegate = delegate
    }
}
