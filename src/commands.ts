// tslint:disable-next-line: no-implicit-dependencies
import { window } from "vscode";
import { TemplateService } from "./TemplateService";
import { ModuleResolver } from "./ModuleResolver";
import { LoggingService } from "./LoggingService";

export type createConfigFileFunction = (
  options?: Map<string, any>
) => Promise<void>;
export type resetModuleCacheFunction = (
  options?: Map<string, any>
) => Promise<void>;

export const createConfigFile = (
  templateService: TemplateService
): createConfigFileFunction => async (options?: Map<string, any>) => {
  const folderResult = await window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
  });
  if (folderResult && folderResult.length === 1) {
    const folderUri = folderResult[0];
    await templateService.writeConfigFile(folderUri, options);
  }
};

export const resetModuleCache = (
  loggingService: LoggingService,
  moduleResolver: ModuleResolver
): resetModuleCacheFunction => async (options?: Map<string, any>) => {
  loggingService.logInfo("Manually resetting ModuleResolver cache");
  moduleResolver.dispose();
};
